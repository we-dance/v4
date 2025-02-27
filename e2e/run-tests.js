const { spawn } = require('child_process');
const { once } = require('events');

async function runTests() {
  console.log('Starting Nuxt preview server...');
  
  const server = spawn('pnpm', ['preview'], {
    stdio: 'inherit',
    shell: true,
  });
  
  // Give the server time to start
  await new Promise(resolve => setTimeout(resolve, 5000));
  
  console.log('Running E2E tests...');
  try {
    const tests = spawn('cd e2e && pnpm install && pnpm test', {
      stdio: 'inherit',
      shell: true,
    });
    
    await once(tests, 'exit');
    console.log('Tests completed. Shutting down server...');
  } finally {
    // Forcibly terminate the server in any case
    server.kill('SIGTERM');
    process.exit(0);
  }
}

runTests().catch(error => {
  console.error('Test error:', error);
  process.exit(1);
}); 