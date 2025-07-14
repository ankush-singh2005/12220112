# Logging Middleware

A reusable middleware utility for logging structured messages to an external logging service.

## 🔧 Installation

```bash
npm install logging-middleware
```

## 🧪 Usage

```ts
import { log } from 'logging-middleware';

log("backend", "error", "handler", "received string, expected bool");
```

## 📌 Allowed Values

- **Stack**: `backend`, `frontend`
- **Level**: `debug`, `info`, `warn`, `error`, `fatal`
- **Package**: backend (`controller`, `db`, etc.), frontend (`api`), shared (`auth`, `utils`, etc.)
