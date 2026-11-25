import { describe, expect, it } from "vitest";

import { canSubmitApplication } from "@/lib/careerpilot-data";

describe("application submission authorization", () => {
  it("keeps submission off until the user explicitly authorizes it", () => {
    expect(canSubmitApplication({ backendConnected: true, userAuthorized: false, platformPermitted: true })).toBe(false);
  });

  it("requires a connected backend to perform a submission", () => {
    expect(canSubmitApplication({ backendConnected: false, userAuthorized: true, platformPermitted: true })).toBe(false);
  });

  it("requires the destination to permit application submission", () => {
    expect(canSubmitApplication({ backendConnected: true, userAuthorized: true, platformPermitted: false })).toBe(false);
  });

  it("allows a submission only when all three prerequisites are confirmed", () => {
    expect(canSubmitApplication({ backendConnected: true, userAuthorized: true, platformPermitted: true })).toBe(true);
  });
});