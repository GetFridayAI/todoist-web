const { spawn } = require('node:child_process');

const args = process.argv.slice(2);
console.log(args);
const useMocks = args.includes('--mock');
const forwardedArgs = args.filter((arg) => arg !== '--mock');

const expoArgs = ['expo', 'start', '--web', ...forwardedArgs];
const command = process.platform === 'win32' ? 'npx.cmd' : 'npx';

const child = spawn(command, expoArgs, {
  stdio: 'inherit',
  env: {
    ...process.env,
    EXPO_PUBLIC_USE_MOCKS: useMocks ? 'true' : 'false',
  },
});

child.on('exit', (code) => {
  process.exit(code ?? 1);
});
