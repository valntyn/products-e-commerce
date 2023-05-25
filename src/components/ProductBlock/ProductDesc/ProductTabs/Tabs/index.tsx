import classNames from 'classnames';
import React, { useState, useEffect, useRef } from 'react';
import './Tabs.scss';

export type ITab = {
  id: string | number;
  label?: string | number;
  quantity?: string;
};

type PropTypes = {
  tabs: ITab[];
  selectedId: string | number;
  onClick?: (id: string | number) => void;
  className?: string;
};

export const Tabs: React.FC<PropTypes> = ({
  className,
  onClick,
  selectedId,
  tabs,
}) => {
  const [animateStyle, setAnimateStyle] = useState({});

  const tabRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const selectedTab = tabRef.current?.querySelector(
      '.tabs__tab--selected',
    ) as HTMLElement;

    if (selectedTab) {
      const { width, left } = selectedTab.getBoundingClientRect();
      const containerLeft = tabRef.current?.getBoundingClientRect().left || 0;

      setAnimateStyle({
        width,
        transform: `translateX(${left - containerLeft}px)`,
      });
    }
  }, [selectedId]);

  return (
    <div className={classNames('tabs', className)} ref={tabRef}>
      {tabs
        && tabs.map((tab) => (
          <div
            key={tab.id}
            className={classNames('tabs__tab', {
              'tabs__tab--selected': tab.id === selectedId,
            })}
            onClick={() => onClick && onClick(tab.id)}
          >
            <p
              className={classNames('tabs__label', {
                'tabs__label--selected': tab.id === selectedId,
              })}
            >
              {tab.label}
            </p>
            {tab.quantity && (
              <p className="tabs__qnty">
                {tab.quantity}
              </p>
            )}
          </div>
        ))}
      <div className="tabs__tab-animated" style={animateStyle} />
    </div>
  );
};
