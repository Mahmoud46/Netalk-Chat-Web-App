## Setup the server

1. Create the `server` folder and get into it with `cd server`.
2. Initialize with `npm init -y`
3. Install dependencies and devDependencies with

```bash
npm install express
npm install -D typescript ts-node @types/node @types/express
```

4. Configure TypeScript with

```bash
npx tsc --init
```

5. Uncomment

```bash
// "rootDir": "./src",
// "outDir": "./dist",
```

6. Add the the following to `tsconfig.json`

```bash
"allowImportingTsExtensions": true,
"noEmit": true
```

7. Add `"type": "module",` to `package.json` if not exists.
