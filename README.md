# opcua-node
An OPC-UA node for serving up a 3D printer interface.

> The [OPC Unified Architecture](https://en.wikipedia.org/wiki/OPC_Unified_Architecture) is a machine-to-machine communication protocol for industrial automation.

## Overview
This server creates an OPC-UA node, responds to queries and serves back information regarding a 3D printer which is fronted by OctoPrint.

At the moment, this is just a proof-of-concept. I wouldn't consider it a complete project yet.

## Installation

```
mkdir ~/sites && cd ~/sites
git clone https://github.com/OutsourcedGuru/opcua-node.git
cd opcua-node
npm install
nano config.js # Edit the values here, especially the API key from OctoPrint
npm start
```

|Description|Version|Author|Last Update|
|:---|:---|:---|:---|
|opcua-node|v1.0.3|OutsourcedGuru|June 12, 2019|

|Donate||Cryptocurrency|
|:-----:|---|:--------:|
| ![eth-receive](https://user-images.githubusercontent.com/15971213/40564950-932d4d10-601f-11e8-90f0-459f8b32f01c.png) || ![btc-receive](https://user-images.githubusercontent.com/15971213/40564971-a2826002-601f-11e8-8d5e-eeb35ab53300.png) |
|Ethereum||Bitcoin|
