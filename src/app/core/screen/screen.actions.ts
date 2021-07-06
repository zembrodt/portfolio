export class SetXs {
  static readonly type = '[Screen] Set Xs';
  constructor(public isXs: boolean) {}
}

export class SetSm {
  static readonly type = '[Screen] Set Sm';
  constructor(public isSm: boolean) {}
}

export class SetMd {
  static readonly type = '[Screen] Set Md';
  constructor(public isMd: boolean) {}
}

export class SetLg {
  static readonly type = '[Screen] Set Lg';
  constructor(public isLg: boolean) {}
}

export class SetXl {
  static readonly type = '[Screen] Set Xl';
  constructor(public isXl: boolean) {}
}
