const args = ['run dev'];
const opts = { stdio: 'inherit', cwd: 'client', shell: true };
require('child_process').spawn('npm', args, opts);
