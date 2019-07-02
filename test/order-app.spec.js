/* eslint-disable quotes */
import assert from 'assert';
import { basename, sep } from 'path';
import OrderApp from '../src/order-app';
import { readFile } from '../src/output/utils';

describe('OrderApp', () => {
  const resourcesDir = `${__dirname}${sep}resources${sep}`;
  const parameters = [
    {inputFile: `${resourcesDir}simple_command.json`, outputFile: `${resourcesDir}sample_result.txt`},
  ];

  parameters.forEach((param) => {
    it(`如果输入的文件为${basename(param.inputFile)}，当调用 OrderApp.checkout() 方法，则得到期望的结果${basename(param.outputFile)} 文件中的字符串`, async () => {
      const inputStr = await readFile(param.inputFile, 'utf8');
      const actualRepresentation = (new OrderApp()).checkout(inputStr); // 实际

      const expectedResult = await readFile(param.outputFile, 'utf8'); // 期望
      assert.equal(actualRepresentation.toString().replace(/\r\n/gi, '\n'), expectedResult.trim().replace(/\r\n/gi, '\n'));
    });
  });
  it(" ", function () {
  });
});
