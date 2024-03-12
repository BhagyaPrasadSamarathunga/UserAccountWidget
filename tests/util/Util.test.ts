import {formatTime} from '../../src/utils/utils';

describe("FormatTime function", () => {
    const startTime = 15;
    const endTime = 19;
    it("return true for the time is in between 3PM - 7PM", () => {
        const dateTime = new Date('Fri Jan 26 2024 15:30:00 GMT+0100');
      expect(isTimeWithinRange({dateTime, startTime,endTime})).toEqual(true);
    });
    it("return false for the time isn't in between 3PM - 7PM", () => {
        const dateTime = new Date('Fri Jan 26 2024 12:30:00 GMT+0100');
      expect(isTimeWithinRange({dateTime, startTime,endTime})).toEqual(false);
    });
  });