/*
 * params:
 * 1. fn - Polling function
 * 2. params - Params for fn
 * 3. conditionFn - If the conditionFn is met
 * 4. timeout - Overall polling time
 * 5. interval - Next api interval
 *
 * Copyright (c) 2020 Davis Chang. Released under the MIT license.
 */
const poll = (fn, params, conditionFn, timeout, interval) => {
  window.polling = { terminate: false };
  const endTime = Number(new Date()) + (timeout || 2000);
  const checkCondition = (resolve, reject) => {
    fn(params).then(
      result => {
        if (window.polling.terminate === true) {
          resolve({ pollingStatus: 'stop' });
        } else if (conditionFn(result)) {
          resolve({ pollingStatus: 'success', ...result });
        } else if (Number(new Date()) < endTime) {
          setTimeout(checkCondition, interval, resolve, reject);
        } else {
          resolve({ pollingStatus: 'failed' });
        }
      },
      () => {
        if (Number(new Date()) < endTime) {
          setTimeout(checkCondition, interval, resolve, reject);
        } else {
          resolve({ pollingStatus: 'failed' });
        }
      },
    );
  };

  return {
    pollPromise: new Promise(checkCondition),
    terminateFn: () => {
      if (!window.polling.terminate) {
        window.polling.terminate = true;
      }
    },
  };
};

export default poll;
