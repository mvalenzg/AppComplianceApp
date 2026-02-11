import { StatusValuePipe } from './status.value-pipe';

describe('StatusValuePipe', () => {
  let pipe: StatusValuePipe;

  beforeEach(() => {
    pipe = new StatusValuePipe();
  });

  it('shoul create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return "Active" when value is true', () => {
    const result = pipe.transform(true);
    expect(result).toBe('Active');
  });

  it('should return "Inactive" when value is true', () => {
    const result = pipe.transform(false);
    expect(result).toBe('Inactive');
  });
});
