import Web3 from 'web3';

// Ganache 本地网络地址
const ganacheUrl = 'http://localhost:7545';
const web3 = new Web3(new Web3.providers.HttpProvider(ganacheUrl));

export default web3;
