[![npm](https://img.shields.io/npm/v/solar-manager-virtual-device.svg?style=flat-square)](https://www.npmjs.com/package/solar-manager-virtual-device)
[![build](https://img.shields.io/github/workflow/status/claudiospizzi/solar-manager-virtual-device/CI?style=flat-square)](https://github.com/claudiospizzi/solar-manager-virtual-device/actions/workflows/ci.yml)

# solar-manager-virtual-device

Solar Manager Virtual Device to integrate unsupported devices into a smart home power management.

## Description

This node module is able to mock a MyStrom Switch device to be used with the Solar Manager. This enables the usage of unsupported devices in a smart home power management. The whole solutions consists of three parts:

- **Virtual Device**  
  Run the virtual device, for example within a Docker container.

- **Solar Manager**  
  Configure a MyStrom Switch within the [Solar Manager configuration](https://web.solar-manager.ch/my-devices/).

- **Integration**  
  Integrate the virtual device with the 3rd party device, for example by using Node-RED and the [node-red-contrib-mystrom-switch](https://flows.nodered.org/node/node-red-contrib-mystrom-switch) node.

### Virtual Device Setup (this module)

### Solar Manager Configuration

### Node-RED Integration

## API

The following methods are available. All follow the exact API implementation as the official [MyStrom Switch](https://api.mystrom.ch/#982cf1bb-c873-4f62-b3c2-1cdfa51e1afe) API. Expect the `/power` resource, this is used to set the current power consumption of the device.

| Method | Resource         | Body              | Response        |
| ------ | ---------------- | ----------------- | --------------- |
| `GET`  | `/report`        |                   | Device state    |
| `GET`  | `/relay?state=1` |                   |                 |
| `GET`  | `/relay?state=0` |                   |                 |
| `GET`  | `/toggle`        |                   | The relay state |
| `POST` | `/power`         | `{ "power": 42 }` |                 |

## Constraint

This module is not associated with the [Solar Manager AG](https://www.solarmanager.ch/). In case of problems with the integration between this module and Solar Manager, open a GitHub issue.

This software is provided "as is", without any guarantees on the function and operation of the Solar Manager device and account. You use it at your own risk. For more details, check the license terms.
