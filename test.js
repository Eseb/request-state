const expect = require('expect');
const RequestState = require('.');

describe('request-state', () => {
  it('has its core functionality', () => {
    expect(RequestState.FAILED.isFailed()).toBe(true);
    expect(RequestState.FAILED.shouldBeRequested()).toBe(true);
    expect(RequestState.NOT_REQUESTED.isFailed()).toBe(false);
    expect(RequestState.NOT_REQUESTED.shouldBeRequested()).toBe(true);
    expect(RequestState.SUCCEEDED.shouldShowAsLoading()).toBe(false);
  });

  it('is immutable', () => {
    const failedState = RequestState.FAILED;
    failedState.state = 12;

    expect(failedState.state).toBe(RequestState.FAILED.state);
    expect(failedState.isFailed()).toBe(true);
    expect(failedState.isSucceeded()).toBe(false);
  });

  it('supports attachments', () => {
    const failureWithError = RequestState.FAILED.withAttachment(404);

    expect(failureWithError.isFailed()).toBe(true);
    expect(failureWithError.attachment).toBe(404);
  });
});
