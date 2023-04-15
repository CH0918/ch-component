/**
 * 创建bem规范类名
 * block：块  element：元素  modifier：修饰符  state：状态
 * block__element--modifier
 * 例子：c-button   c-button__element--disabled
 * state控制状态：is-checked is-enabled
 *
 * 使用：:class="bem.b()"
 *
 */

function _bem(
  prefixName: string,
  blockName: string,
  element: string,
  modifier: string
) {
  if (blockName) {
    prefixName += `-${blockName}`;
  }
  if (element) {
    prefixName += `__${element}`;
  }
  if (modifier) {
    prefixName += `--${modifier}`;
  }
  return prefixName;
}

function createBEM(prefixName: string) {
  const b = (blockName: string = '') => _bem(prefixName, blockName, '', '');
  const e = (element: string) =>
    element ? _bem(prefixName, '', element, '') : '';
  const m = (modifier: string = '') =>
    modifier ? _bem(prefixName, '', '', modifier) : '';

  const be = (blockName: string = '', element: string = '') =>
    blockName && element ? _bem(prefixName, blockName, element, '') : '';
  const bm = (blockName: string = '', modifier: string = '') =>
    blockName && modifier ? _bem(prefixName, blockName, '', modifier) : '';
  const em = (element: string = '', modifier: string = '') =>
    element && modifier ? _bem(prefixName, '', element, modifier) : '';

  const bem = (
    blockName: string = '',
    element: string = '',
    modifier: string = ''
  ) =>
    blockName && element && modifier
      ? _bem(prefixName, blockName, element, modifier)
      : '';

  const is = (name: string, state: string | boolean) =>
    state ? `is-${name}` : '';
  return {
    b,
    e,
    m,
    be,
    bm,
    em,
    bem,
    is,
  };
}

function createNamespace(name: string) {
  const prefixName = `c-${name}`;
  return createBEM(prefixName);
}

// const bem = createNamespace('icon');
// console.log(bem.b('box'));
// console.log(bem.e('element'));
// console.log(bem.m('modifier'));
// console.log(bem.bem('box', 'element', 'modifier'));
// console.log(bem.is('checked', true));
// console.log(bem.be('box', 'element'));
// console.log(bem.bm('box', 'modifier'));
// console.log(bem.em('element', 'modifier'));
