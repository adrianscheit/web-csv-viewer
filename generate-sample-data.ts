console.log('t,sin,cos');
for (let i = 0; i < 20; i += 0.002) {
    console.log(`${i},${Math.sin(i)},${Math.cos(i)}`);
}