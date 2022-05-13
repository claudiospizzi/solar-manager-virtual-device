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

This module can be used within a Docker container. For example, the following Dockerfile can be used to build a Docker image for the virtual device. It's recommended to use a dedicated external network like a `macvlan` to have a dedicated IP address for the virtual device, as it's required to use port 80.

```Dockerfile
FROM node:alpine

RUN npm install -g solar-manager-virtual-device

ENTRYPOINT [ "/usr/local/bin/solar-manager-virtual-device", "/etc/solar-manager-virtual-device.json" ]
```

### Solar Manager Configuration

Within the Solar Manager, a new device can be added with the type `Smart Plug` and the name `MyStrom Energy Control Switch`. Specify the IP address of the virtual device as the `IP Address` field. Do not use any feature around the temperature, as this is currently not supported.

### Node-RED Integration

Finally, the integration to the actual physical device needs to be implemented. The implementation must scan the report for the relay state to turn on or off. In addition, the current power usage should be reported every 5 seconds, as the Solar Manager will scan the device status every 5 seconds. This can be done by using the [node-red-contrib-mystrom-switch](https://flows.nodered.org/node/node-red-contrib-mystrom-switch) Node-RED module.

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
