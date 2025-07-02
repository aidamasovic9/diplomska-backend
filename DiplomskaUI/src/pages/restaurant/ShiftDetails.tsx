import * as React from "react";
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import '../../styles/SectionDetails.css';
import {useState} from "react";

interface AccordionDetailsProps {
    shifts: {
        title: string;
        content: string;
        isFull: boolean;
        personImage?: string;
    }[];
}

const ShiftDetailsComponent: React.FC<AccordionDetailsProps> = ({ shifts }) => {
    const [expandedShift, setExpandedShift] = useState<number | null>(null);

    const handleAccordionToggle = (index: number) => {
        setExpandedShift((prev) => (prev === index ? null : index));
    };

    return (
        <div style={{ width: '100%'}}>
            {shifts.map((shift, index) => (
                <Accordion key={index}
                           expanded={expandedShift === index}
                           onChange={() => handleAccordionToggle(index)}
                           style={{
                               backgroundColor: shift.isFull ? '#e0e0e0' : 'transparent',
                           }}>
                    <AccordionSummary expandIcon={null} aria-controls={`${shift.title}-content`} id={`${shift.title}-header`}>
                        <Typography>{shift.title}</Typography>
                        {shift.personImage && <img
                            src={shift.personImage}
                            alt={shift.title}
                            className="person-image"
                        />}
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>{shift.content}</Typography>
                    </AccordionDetails>
                </Accordion>
            ))}
        </div>
    );
};

export default ShiftDetailsComponent;
