# Hitman

A tool for the REST API testing.

## Development setup

### Install xcode

```
xcode-select --install
```

### Install rust

```
curl --proto '=https' --tlsv1.2 https://sh.rustup.rs -sSf | sh
```

### Install pnpm

```
brew install pnpm
```

### Start development server

```
pnpm install
pnpm tauri dev
```

### Build

```
pnpm tauri build
```