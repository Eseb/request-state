import expect from 'expect';

import RequestState, {
  FAILED,
  IN_PROGRESS,
  NOT_REQUESTED,
  SUCCEEDED,
} from './request-state';

describe('request-state', () => {
  it('has its core functionality', () => {
    expect(FAILED.isFailed()).toBe(true);
    expect(FAILED.shouldBeRequested()).toBe(true);
    expect(NOT_REQUESTED.isFailed()).toBe(false);
    expect(NOT_REQUESTED.shouldBeRequested()).toBe(true);
    expect(SUCCEEDED.shouldShowAsLoading()).toBe(false);
  });

  it('is immutable', () => {
    const failedState = FAILED;

    expect(() => {
      failedState.state = 12;
    }).toThrow();

    expect(failedState.state).toBe(FAILED.state);
    expect(failedState.isFailed()).toBe(true);
    expect(failedState.isSucceeded()).toBe(false);
  });

  it('supports attachments', () => {
    const failureWithError = FAILED.withAttachment(404);

    expect(failureWithError.isFailed()).toBe(true);
    expect(failureWithError.attachment).toBe(404);
  });
});
