/**
 * Super class for all controllers
 */
export default abstract class Controller {
  protected name: string;

  constructor(name: string) {
    this.name = name;
  }

  /**
   * @returns controller name as string
   */
  public getName(): string {
    return this.name;
  }
}
