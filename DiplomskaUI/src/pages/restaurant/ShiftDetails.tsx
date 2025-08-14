import * as React from "react";
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import '../../styles/SectionDetails.css';
import { useState } from "react";
import { ShiftResponse } from '../../api/generated/model/shift-response';
import {useSelector} from "react-redux";
import {RootState} from "../../../src/context/store/store.ts";

interface AccordionDetailsProps {
    shifts: ShiftResponse[] | undefined;
}

const ShiftDetailsComponent: React.FC<AccordionDetailsProps> = ({ shifts }) => {
    const [expandedShift, setExpandedShift] = useState<number | null>(null);
    const favoriteUsers = useSelector((state: RootState) => state.favoriteUsers.favoriteUsers);
    const favoriteUserIds = favoriteUsers.map(u => u.id);


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
                                className={`person-image ${
                                    user.id !== undefined && favoriteUserIds.includes(user.id)
                                        ? 'favorite-user'
                                        : ''
                                }`}
                                key={index}
                            />
                        ))}
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>{shift?.users?.map((user, index) => (
                            <img
                                src={`${baseUrl}/images/${user.image}`}
                                alt={user.shortName}
                                className={`person-image ${
                                    user.id !== undefined && favoriteUserIds.includes(user.id)
                                        ? 'favorite-user'
                                        : ''
                                }`}
                                key={index}
                            />
                        ))}</Typography>
                        <div className="users-shortnames-container">
                            {shift?.users?.map((user, index) => (
                                <span key={index} className="user-shortname" title={`${user.firstName} ${user.lastName}`}>
                                      {user.shortName}
                                </span>
                            ))}
                        </div>
                    </AccordionDetails>
                </Accordion>
            ))}
        </div>
    );
};

export default ShiftDetailsComponent;
