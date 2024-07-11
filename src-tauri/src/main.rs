// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use reqwest::{Method, Proxy};
use serde::{Deserialize, Serialize};

#[derive(Deserialize, Debug)]
struct RequestPayload {
    url: String,
    method: String,
    headers: Option<Vec<(String, String)>>,
    body: Option<String>,
    proxy: Option<String>,
}

#[derive(Serialize)]
struct ResponsePayload {
    status: u16,
    headers: Vec<(String, String)>,
    body: String,
}

#[tauri::command]
async fn send_request(payload: RequestPayload) -> Result<ResponsePayload, String> {
    println!("Sending request.... {:#?}", payload);
    let client_builder = reqwest::Client::builder();

    let client_builder = if let Some(proxy_url) = payload.proxy {
        client_builder.proxy(Proxy::http(&proxy_url).map_err(|e| e.to_string())?)
    } else {
        client_builder
    };

    let client = client_builder.build().map_err(|e| e.to_string())?;

    let method = payload
        .method
        .to_uppercase()
        .parse::<Method>()
        .map_err(|e| e.to_string())?;

    let mut request_builder = client.request(method, &payload.url);

    if let Some(headers) = payload.headers {
        for (key, value) in headers {
            request_builder = request_builder.header(&key, &value);
        }
    }

    if let Some(body) = payload.body {
        request_builder = request_builder.body(body);
    }

    let response = request_builder.send().await.map_err(|e| e.to_string())?;
    let status = response.status().as_u16();
    let headers = response
        .headers()
        .iter()
        .map(|(k, v)| (k.to_string(), v.to_str().unwrap_or("").to_string()))
        .collect();

    let body = response.text().await.map_err(|e| e.to_string())?;

    //Ok(ResponsePayload { status, headers, body })
    Ok(ResponsePayload {
        status,
        headers,
        body,
    })
}

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    println!("Hello... ");
    format!("Hello, {}! You've been greeted from Rust!", name)
}

fn main() {
    println!("Starting....");
    tauri::Builder::default()
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_http::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![greet, send_request])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
