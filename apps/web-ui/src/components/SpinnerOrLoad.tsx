import { ClimbingBoxLoader } from 'react-spinners';

export interface SpinnerOrLoad {
    isLoading: boolean;
    children: JSX.Element;
}

export function SpinnerOrLoad(props: SpinnerOrLoad) {
    if (props.isLoading) {
        return <ClimbingBoxLoader size={30} />;
    }
    return props.children;
}

export default SpinnerOrLoad;
