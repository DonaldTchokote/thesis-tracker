import { Level } from '@prisma/client'
import { Badge } from '@radix-ui/themes'
import React from 'react'

const levelMap: Record<
    Level, 
    {
      label: string, 
      color: 'blue'| 'green' | 'violet' | 'red'}
    > = {
    EMPTY: {label: 'UNDEFINED', color: 'red'},
    P_PROJECT: {label: 'P. PROJECT', color: 'green'},
    BACHELOR: {label: 'BACHELOR', color:'blue'},
    MASTER: {label: 'MASTER', color:'violet'},

};

const ThesisLevelBadge = ({level}: {level: Level}) => {
  return (
    <Badge color={levelMap[level].color}>
        {levelMap[level].label}
    </Badge>
  )
}

export default ThesisLevelBadge