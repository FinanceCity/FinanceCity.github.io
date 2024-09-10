// Check if MetaMask is installed
if (typeof window.ethereum !== 'undefined') {
    console.log('MetaMask is installed!');
}

const connectButton = document.getElementById('connectWallet');

connectButton.addEventListener('click', async () => {
    try {
        // Request account access if needed
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        
        // Update button text to show connected wallet address
        connectButton.textContent = `Connected: ${account.slice(0, 6)}...${account.slice(-4)}`;
        
        console.log('Connected to account:', account);
    } catch (error) {
        console.error('Error connecting to MetaMask:', error);
        alert('MetaMask connection failed. Please try again.');
    }
});