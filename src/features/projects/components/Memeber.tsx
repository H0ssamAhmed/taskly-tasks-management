import Avatar from '@/shared/UI/Avatar'


interface Props {
    name: string,
    email: string
}
const Memeber = ({ name, email }: Props) => {
    return (
        <>
            <Avatar name={name} className='text-sm p-4 ' />
            <div >
                <p className='headline-lg text-sm!'>{name}</p>
                <p className='body-md text-xs'>{email}</p>
            </div>
        </>

    )
}

export default Memeber