import React from 'react';
import './Board.css';

const Board = (props) => {
    const renderRows = () => (
        props.board.map((row, idx) => renderRow(row, idx))
    );

    const renderRow = (row, rowIdx) => (
        <tr key={rowIdx}>
            { row.map((cell, colIdx) => renderCell(rowIdx, colIdx, cell)) }
        </tr>
    );

    const renderCell = (rowIdx, colIdx, cell) => (
        <td key={colIdx} onClick={() => props.handleCellClicked(rowIdx, colIdx, cell)}>{cell}</td>
    );

    return (
        <table className={props.allowClick ? '' : 'disabled_table'}>
            <tbody>
            { renderRows() }
            </tbody>
        </table>
    );
};
export default Board;
