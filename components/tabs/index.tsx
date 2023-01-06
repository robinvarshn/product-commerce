import '@styles/_tabs.scss';
import React from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import { Tablist, TabProps } from './tabs';

const TabsWrapper = ({ tabList }: TabProps): JSX.Element => {
    return (
        <React.Fragment>
            <Tabs>
                <TabList>
                    {tabList.map((tabData: Tablist, index: number) => {
                        return (
                            <React.Fragment key={index}>
                                <Tab>{tabData.tabHeader}</Tab>
                            </React.Fragment>
                        );
                    })}
                </TabList>

                {tabList.map((tabData: Tablist, index: number) => {
                    return (
                        <React.Fragment key={index}>
                            <TabPanel>{tabData.tabContent}</TabPanel>
                        </React.Fragment>
                    );
                })}
            </Tabs>
        </React.Fragment>
    );
};

export default TabsWrapper;
