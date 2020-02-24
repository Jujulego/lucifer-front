import { PLvl } from 'data/permission';
import { buildLevel, decomposeLevel } from 'utils/permissions';

// Tests
describe("utils/permissions", () => {
  // decompose tests
  test("decompose ALL", () => {
    const dlvl = decomposeLevel(PLvl.ALL);

    expect(dlvl.create).toBeTruthy();
    expect(dlvl.read  ).toBeTruthy();
    expect(dlvl.update).toBeTruthy();
    expect(dlvl.delete).toBeTruthy();
  });

  test("decompose NONE", () => {
    const dlvl = decomposeLevel(PLvl.NONE);

    expect(dlvl.create).toBeFalsy();
    expect(dlvl.read  ).toBeFalsy();
    expect(dlvl.update).toBeFalsy();
    expect(dlvl.delete).toBeFalsy();
  });

  test("decompose one", () => {
    const dlvl = decomposeLevel(PLvl.READ);

    expect(dlvl.create).toBeFalsy();
    expect(dlvl.read  ).toBeTruthy();
    expect(dlvl.update).toBeFalsy();
    expect(dlvl.delete).toBeFalsy();
  });

  test("decompose multiple", () => {
    const dlvl = decomposeLevel(PLvl.READ | PLvl.DELETE);

    expect(dlvl.create).toBeFalsy();
    expect(dlvl.read  ).toBeTruthy();
    expect(dlvl.update).toBeFalsy();
    expect(dlvl.delete).toBeTruthy();
  });

  // build tests
  test("build ALL", () => {
    const lvl = buildLevel({
      create: true, read: true, update: true, delete: true
    });

    expect(lvl).toEqual(PLvl.ALL);
  });

  test("build NONE", () => {
    const lvl = buildLevel({
      create: false, read: false, update: false, delete: false
    });

    expect(lvl).toEqual(PLvl.NONE);
  });

  test("build one", () => {
    const lvl = buildLevel({
      create: false, read: false, update: true, delete: false
    });

    expect(lvl).toEqual(PLvl.UPDATE);
  });

  test("build multiple", () => {
    const lvl = buildLevel({
      create: false, read: true, update: true, delete: false
    });

    expect(lvl).toEqual(PLvl.READ | PLvl.UPDATE);
  });
});