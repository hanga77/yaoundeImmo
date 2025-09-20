import React from 'react';
import { BuildingOffice2Icon, WrenchScrewdriverIcon, TruckIcon, HomeModernIcon, LifebuoyIcon } from '@heroicons/react/24/outline';

const iconMap: { [key: string]: React.ElementType } = {
  BuildingOffice2Icon,
  WrenchScrewdriverIcon,
  TruckIcon,
  HomeModernIcon,
  LifebuoyIcon,
};

export const iconNames = Object.keys(iconMap);

interface IconProps {
  name: string;
  className?: string;
}

export const Icon: React.FC<IconProps> = ({ name, className }) => {
  const IconComponent = iconMap[name];

  if (!IconComponent) {
    // Return a default icon or null if the name is not found
    return <LifebuoyIcon className={className} />;
  }

  return <IconComponent className={className} />;
};
