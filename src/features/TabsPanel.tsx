import React from "react";
import {Box, Button, Tab, Tabs, Typography} from "@mui/material";
import MainTab from "./Tabs/MainTab";
import PkTab from "./Tabs/PkTab";
import SkTab from "./Tabs/SkTab";
import NkTab from "./Tabs/NkTab";
import GkTab from "./Tabs/GkTab";
import VvTab from "./Tabs/VvTab";
import KvTab from "./Tabs/KvTab";
import HistorySelect from "./Other/HistorySelect";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 3}}>
                    <Typography component={"span"}>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function allyProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    }
}

function TabsPanel() {
    const [value, setValue] = React.useState(0)
    const [pk, setPk] = React.useState(1)
    const [sk, setSk] = React.useState(1)

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    }

    return (
        <Box sx={{width: "100%", height: "90vh"}}>
            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                <Tabs value={value} onChange={handleChange} aria-label="tabs">
                    <Tab label="Основные" {...allyProps(0)} />
                    <Tab label="Планы координации" {...allyProps(1)} />
                    <Tab label="Суточные карты" {...allyProps(2)} />
                    <Tab label="Недельные карты" {...allyProps(3)} />
                    <Tab label="Карта года" {...allyProps(4)} />
                    <Tab label="Внешние входы" {...allyProps(5)} />
                    <Tab label="Контроль входов" {...allyProps(6)} />
                    <HistorySelect/>
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <MainTab/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <PkTab pk={pk} setPk={setPk}/>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <SkTab sk={sk} setSk={setSk}/>
            </TabPanel>
            <TabPanel value={value} index={3}>
                <NkTab/>
            </TabPanel>
            <TabPanel value={value} index={4}>
                <GkTab/>
            </TabPanel>
            <TabPanel value={value} index={5}>
                <VvTab/>
            </TabPanel>
            <TabPanel value={value} index={6}>
                <KvTab/>
            </TabPanel>
        </Box>
    )
}

export default TabsPanel;