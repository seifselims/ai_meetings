import {createAvatar} from '@dicebear/core';
import {initials, botttsNeutral} from '@dicebear/collection';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

interface GeneratedAvatarProps {
    seed: string;
    className?: string;
    variant:'botttsNeutral' | 'initials';
}

export const GeneratedAvatar=({
    seed,
    className,
    variant
}: GeneratedAvatarProps)=>{
    let avatar 
    if(variant === 'botttsNeutral') {
        avatar = createAvatar(botttsNeutral, {
            seed
        });
    } else if(variant === 'initials') {
        avatar = createAvatar(initials, {
            seed,
            fontWeight:500,
            fontSize: 42,
        });
    
}
return (
    <Avatar className={cn(className)}>
        <AvatarImage src={avatar!.toDataUri()} alt="Avatar"/>
        <AvatarFallback>
            {seed.charAt(0).toUpperCase()}</AvatarFallback>
    </Avatar>
)
}