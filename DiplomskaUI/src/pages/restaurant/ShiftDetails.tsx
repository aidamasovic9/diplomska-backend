import * as React from "react";
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import '../../styles/SectionDetails.css';
import { useState } from "react";
import { ShiftResponse } from '../../api/generated/model/shift-response';

interface AccordionDetailsProps {
    shifts: ShiftResponse[] | undefined;
}

const ShiftDetailsComponent: React.FC<AccordionDetailsProps> = ({ shifts }) => {
    const [expandedShift, setExpandedShift] = useState<number | null>(null);

    const handleAccordionToggle = (index: number) => {
        setExpandedShift((prev) => (prev === index ? null : index));
    };

    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    return (
        <div style={{ width: '100%'}}>
            {shifts?.map((shift, index) => (
                <Accordion key={index}
                           expanded={expandedShift === index}
                           onChange={() => handleAccordionToggle(index)}
                           style={{
                               backgroundColor: shift.occupiedPlaces === shift.maximumGuests ? '#e0e0e0' : 'transparent',
                           }}>
                    <AccordionSummary expandIcon={null} aria-controls={`${shift.name}-content`} id={`${shift.name}-header`}>
                        <Typography>{shift.name}</Typography>
                        {shift?.users?.map((user, index) => (
                            <img
                                src={`${baseUrl}/images/${user.image}`}
                                alt={user.shortName}
                                className="person-image"
                                key={index}
                            />
                        ))}
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>{shift?.users?.map((user, index) => (
                            <img
                                src={`${baseUrl}/images/${user.image}`}
                                alt={user.shortName}
                                className="person-image"
                                key={index}
                            />
                        ))}</Typography>
                    </AccordionDetails>
                </Accordion>
            ))}
        </div>
    );
};

export default ShiftDetailsComponent;
