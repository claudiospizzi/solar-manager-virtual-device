/**
 * Object structure for a MyStrom Switch report.
 */
export interface MyStromSwitchReport {
  power: number;
  Ws: number;
  relay: boolean;
  temperature: number;
}

/**
 * Object structure for a MyStrom Switch relay status.
 */
export interface MyStromSwitchRelay {
  relay: boolean;
}

/**
 * Class representing a virtual MyStrom Switch device.
 */
export class MyStromSwitch {
  private static instance: MyStromSwitch;

  private power = 0;
  private relay = false;

  /**
   * Support the singleton pattern.
   */
  private constructor() {
    // Do nothing
  }

  /**
   * Allow only one MyStromSwitch device, therefore the singleton pattern is
   * used with a static instance.
   */
  public static getInstance(): MyStromSwitch {
    if (!MyStromSwitch.instance) {
      MyStromSwitch.instance = new MyStromSwitch();
    }
    return MyStromSwitch.instance;
  }

  public getReport(): MyStromSwitchReport {
    return {
      power: this.power,
      Ws: 0,
      relay: this.relay,
      temperature: 0,
    };
  }

  public getRelay(): MyStromSwitchRelay {
    return {
      relay: this.relay,
    };
  }

  public setRelay(relay: boolean): void {
    this.relay = relay;
    if (!this.relay) {
      this.setPower(0);
    }
  }

  public toggleRelay(): void {
    this.relay = !this.relay;
    if (!this.relay) {
      this.setPower(0);
    }
  }

  public setPower(power: number): void {
    this.power = power;
  }
}
