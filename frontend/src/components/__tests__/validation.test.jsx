import {
  validateEmail,
  validatePassword,
  validatePhoneNumber,
  validatePostalCode,
} from "../../utils/validationMethods";
import { expect, jest, test } from "@jest/globals";

test("Validate Email Correctly", () => {
  expect(validateEmail("hello")).toBeFalsy();
  expect(validateEmail("hello@gmail")).toBeFalsy();
  expect(validateEmail("hello@gmail.com")).toBeTruthy();
});

test("Validate Phone Number Correctly", () => {
  expect(validatePhoneNumber("1020304050")).toBeFalsy();
  expect(validatePhoneNumber("552211")).toBeFalsy();
  expect(validatePhoneNumber("88776655")).toBeTruthy();
});

test("Validate Password Correctly", () => {
  expect(validatePassword("123456!")).toBeFalsy();
  expect(validatePassword("abcdefgh")).toBeFalsy();
  expect(validatePassword("abcdefg$")).toBeFalsy();
  expect(validatePassword("10203040!")).toBeTruthy();
});

test("Validate Postal Code Correctly", () => {
  expect(validatePostalCode("12345!")).toBeFalsy();
  expect(validatePostalCode("1234567")).toBeFalsy();
  expect(validatePostalCode("456789")).toBeTruthy();
});
