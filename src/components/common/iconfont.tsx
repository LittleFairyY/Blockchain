import * as React from 'react';
import classnames from 'classnames';

interface IProps {
  size?: number;
  type: string;
  extraClass?: string;
  onClick?: () => void;
  iProps?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
  >;
}

export default (props: IProps) => {
  return (
    <i
      className={classnames(['iconfont', props.type, props.extraClass])}
      style={props.size ? { fontSize: props.size } : {}}
      onClick={props.onClick}
      {...props.iProps}
    />
  );
};
