import React from 'react';
import Card from '../../common/UI/Card/Card';
import InputField from '../../common/UI/InputField/InputField.js';

const jobCreator = () => {
    return(
        <div>
            <Card>
                <form>
                    <InputField type={"text"} label={"What is your name?"} />
                    <InputField type={"number"} label={"Phone"} />
                    <InputField type={"password"} label={"Password"} />
                </form>
            </Card>
        </div>
    );
};

export default jobCreator;