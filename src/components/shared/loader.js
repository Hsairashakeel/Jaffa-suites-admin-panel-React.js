import React from 'react'
import { useLoading, Oval } from '@agney/react-loading';

function Content() {
  const { containerProps, indicatorEl } = useLoading({
    loading: true,
    indicator: <Oval width="50" />,
  });

  return (
    <section {...containerProps}>
      {indicatorEl} 
    </section>
  );
}

export default Content;