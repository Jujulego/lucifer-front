import React from 'react';
import moment from 'moment';
import { boolean, date } from '@storybook/addon-knobs';

import RelativeDate from '../components/RelativeDate';

// Stories
export default {
  title: 'Basics/RelativeDate',
  component: RelativeDate
}

export const from_now = () => (
  <RelativeDate
    mode="from"
    date={date('date', moment().add(1, 'day').toDate())}
    withoutPrefix={boolean('withoutPrefix', false)}
  />
);

export const to_now = () => (
  <RelativeDate
    mode="to"
    date={date('date', moment().add(1, 'day').toDate())}
    withoutPrefix={boolean('withoutPrefix', false)}
  />
);
