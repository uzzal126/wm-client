import { getGravatarURL } from '../misc';

function GravatarAvatar({ email, size = 80 }: { email: string, size?: number }) {
    return <img className="rounded-circle" style={{ width: size, height: size }} src={getGravatarURL(email, size)} alt="User's Gravatar" />;
}

export default GravatarAvatar;
