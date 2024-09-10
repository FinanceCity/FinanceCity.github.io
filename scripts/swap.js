const swapButton = document.getElementById('swap-button');

// Check if MetaMask is installed
if (typeof window.ethereum !== 'undefined') {
    console.log('MetaMask is installed!');
}

swapButton.addEventListener('click', async () => {
    const fromToken = document.getElementById('from-token').value;
    const toToken = document.getElementById('to-token').value;
    const fromAmount = document.getElementById('from-amount').value;

    if (!fromAmount) {
        alert('Please enter an amount.');
        return;
    }

    // Initialize ethers.js and connect MetaMask
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    try {
        // Request account access if needed
        await provider.send('eth_requestAccounts', []);

        const address = await signer.getAddress();
        console.log('Address:', address);

        // Now interact with Uniswap contract for token swap
        // Example: Using the Uniswap Router contract for swapping tokens
        const uniswapRouter = new ethers.Contract(
            '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f', // Uniswap Router address (replace with actual)
            [
                // ABI fragment for Uniswap Router (simplified for swapExactETHForTokens)
                'function swapExactETHForTokens(uint amountOutMin, address[] calldata path, address to, uint deadline) external payable returns (uint[] memory amounts)'
            ],
            signer
        );

        const path = [
            '0xC02aaA39b223FE8D0A0E5C4F27eAD9083C756Cc2', // WETH
            '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606e48', // USDC (or DAI, replace as needed)
        ];

        const amountOutMin = ethers.utils.parseUnits('0.1', 18); // Set your minimum output amount
        const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 minutes from the current Unix time

        // Call the swap function
        const tx = await uniswapRouter.swapExactETHForTokens(
            amountOutMin,
            path,
            address,
            deadline,
            { value: ethers.utils.parseUnits(fromAmount, 18) }
        );

        console.log('Swap transaction:', tx);
    } catch (error) {
        console.error('Error swapping tokens:', error);
    }
});