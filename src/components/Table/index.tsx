import React from "react";
import "./Table.css";
interface Iprops {
    countries: any;
}
interface ICountriesprops {
    country: any;
    cases: any;
}
export const Table: React.FC<Iprops> = ({ countries }) => {
    return (
        <div className="table">
            {countries.map(
                ({ country, cases }: ICountriesprops, idx: number) => (
                    <tr key={idx}>
                        <td>{country}</td>
                        <td>
                            <strong>{cases}</strong>
                        </td>
                    </tr>
                )
            )}
        </div>
    );
};
