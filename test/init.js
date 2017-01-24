import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import chaiSinon from 'sinon-chai';

import sinon from 'sinon';
import React from 'react';
import { mount } from 'enzyme';

chai
.use(chaiEnzyme())
.use(chaiSinon)
.should();

global.sinon = sinon;
global.React = React;

global.mount = mount;