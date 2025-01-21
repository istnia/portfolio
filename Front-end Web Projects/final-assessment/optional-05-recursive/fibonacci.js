function fibonacci(n) {
    if (n < 0) {
        throw new Error("Negative arguments are not supported");
    }
    
    if (n === 0) return [0];
    if (n === 1) return [0, 1];
    
    //rekursi
    const sequence = fibonacci(n-1);        
    sequence.push(sequence[n-1] + sequence[n-2]);
    return sequence;
}
// Jangan hapus kode di bawah ini!
export default fibonacci;
