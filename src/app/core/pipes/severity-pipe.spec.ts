import { SeverityPipe } from './severity-pipe';

describe('SeverityPipe', () => {
  let pipe: SeverityPipe;

  beforeEach(() => {
    pipe = new SeverityPipe();
  });

  it('shoul create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return "success" when value is true', () => {
    const result = pipe.transform(true);
    expect(result).toBe('success');
  });

  it('should return "danger" when value is true', () => {
    const result = pipe.transform(false);
    expect(result).toBe('danger');
  });
});
