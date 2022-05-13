/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { Request, Response } from 'express';
import { MyStromSwitch } from '../models/mystrom-switch';

const getReport = async (_req: Request, res: Response) => {
  const switchInstance = MyStromSwitch.getInstance();
  return res.status(200).json(switchInstance.getReport());
};

const setRelay = async (req: Request, res: Response) => {
  const switchInstance = MyStromSwitch.getInstance();
  if (req.query.state === '1' || req.query.state === '0') {
    const relay = req.query.state === '1';
    switchInstance.setRelay(relay);
    return res.status(200).json();
  } else {
    return res.status(400).json();
  }
};

const toggleRelay = async (_req: Request, res: Response) => {
  const switchInstance = MyStromSwitch.getInstance();
  switchInstance.toggleRelay();
  return res.status(200).json(switchInstance.getRelay());
};

const setPower = async (req: Request, res: Response) => {
  const switchInstance = MyStromSwitch.getInstance();
  const power = parseInt(req.body.power);
  if (!isNaN(power)) {
    switchInstance.setPower(power);
    return res.status(200).json();
  } else {
    return res.status(400).json();
  }
};

export default { getReport, setRelay, toggleRelay, setPower };
