// @flow
import invariant from '../src/tiny-invariant';

it('should not have any message when it isn\' explicitly passed', () => {
  try {
    invariant(false);
  } catch (e) {
    invariant(e instanceof Error);
    expect(e.message).toEqual('');
  }
});

it('should have no prefix by default', () => {
  try {
    invariant(false, 'my message');
  } catch (e) {
    invariant(e instanceof Error);
    expect(e.message).toEqual('my message');
  }
});

it('should have a prefix if passed', () => {
  try {
    invariant(false, 'my message', 'my prefix');
  } catch (e) {
    invariant(e instanceof Error);
    expect(e.message).toEqual('my prefix: my message');
  }
});

it('should have only the prefix without \': \' if there is no message', () => {
  try {
    invariant(false, undefined, 'my prefix');
  } catch (e) {
    invariant(e instanceof Error);
    expect(e.message).toEqual('my prefix');
  }
})

it('should not execute a message function if the invariant does not throw', () => {
  const message = jest.fn(() => 'lazy message');
  invariant(true, message);
  expect(message).not.toHaveBeenCalled();
});

it('should execute a message function if the invariant does throw', () => {
  const message = jest.fn(() => 'lazy message');
  try {
    invariant(false, message);
  } catch (e) {
    invariant(e instanceof Error);
    expect(message).toHaveBeenCalled();
    expect(e.message).toEqual('lazy message');
  }
});
