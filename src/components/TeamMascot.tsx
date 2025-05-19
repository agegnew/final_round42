import React from 'react';
import Image from 'next/image';

interface TeamMascotProps {
  team: string;
  className?: string;
}

const TeamMascot: React.FC<TeamMascotProps> = ({ team, className = '' }) => {
  const getMascotPath = (team: string) => {
    switch (team.toLowerCase()) {
      case 'falcon':
        return '/animations/falcon.svg';
      case 'leopard':
        return '/animations/leopard.svg';
      case 'oryx':
        return '/animations/oryx.svg';
      case 'wolf':
        return '/animations/wolf.svg';
      default:
        return '';
    }
  };

  return (
    <div className={`relative w-24 h-24 ${className}`}>
      <Image
        src={getMascotPath(team)}
        alt={`${team} mascot`}
        width={96}
        height={96}
        className="w-full h-full object-contain"
      />
    </div>
  );
};

export default TeamMascot; 