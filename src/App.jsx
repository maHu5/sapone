import React, { Activity, useState } from 'react'

import SapOneGrid from './components/ui/SapOneGrid'
import SapOnePile from './components/ui/SapOnePile'

import Bus from './components/modules/Bus'
import Register from './components/modules/Register'
import Alu from './components/modules/Alu'
import Flags from './components/modules/Flags'
import ProgramCounter from './components/modules/ProgramCounter'
import InputOutput from './components/modules/InputOutput'
import ControlSignals from './components/modules/ControlSignals'
import Clock from './components/modules/Clock'
import MemoryAddressRegister from './components/modules/MemoryAddressRegister'
import Ram from './components/modules/Ram'
import InstructionRegister from './components/modules/InstructionRegister'
import ControlUnit from './components/modules/ControlUnit'
import useControls from './components/hooks/useControls'
import useClock from './components/hooks/useClock'
import useRegisterManager from './components/hooks/useRegisterManager'
import useControlUnit from './components/hooks/useControlUnit'
import RamMonitor from './components/modules/RamMonitor'
import Reset from './components/modules/Reset'
import Led from './components/ui/led/Led'
import Lightbox from './components/ui/ram/Lightbox'

function App() {
    const [ramEditorOpen, setRamEditorOpen] = useState(false)
    const cntl = useControls()
    const { clock, singleStepDown, singleStepUp, isRunning, toggleRunning } = useClock({
        hlt: cntl.controlFlags.hlt
    })

    const { state, changeIO, changeRam } = useRegisterManager({
        clock,
        tscEnabled: !cntl.cue,
        getActiveControlFlags: cntl.getActiveControlFlags,
        rst: cntl.rst
    })

    useControlUnit({
        tscEnabled: !cntl.cue,
        IR: state['IR'].pins,
        TSC: state['TSC'].pins,
        FR: state['FR'].pins,
        setControlFlags: cntl.setControlFlags,
        rst: cntl.rst
    })

    const changeIOPins = (val) => {
        const pins = val(state['IO'].pins)
        changeIO(pins)
    }

    const toggleEditRam = () => {
        setRamEditorOpen((v) => !v)
    }

    const onSaveRam = (ram) => {
        changeRam(ram)
        setRamEditorOpen(false)
    }

    const toggleControlUnit = () => {
        cntl.setCue((v) => !v)
    }

    return (
        <>
            <h1>SAP One Computer</h1>
            <SapOneGrid>
                <SapOnePile>
                    <ProgramCounter pins={state['PC'].pins} />
                    <MemoryAddressRegister pins={state['MAR'].pins} />
                    <Ram pins={state['RAM'].pins} onClick={toggleEditRam} />
                    <InstructionRegister pins={state['IR'].pins} />
                    <ControlUnit pins={state['TSC'].pins} onClick={toggleControlUnit} enabled={!cntl.cue} />
                    <Reset onButtonDown={() => cntl.setRst(true)} onButtonUp={() => cntl.setRst(false)} />
                </SapOnePile>
                <SapOnePile>
                    <Bus pins={state['BUS'].pins} />
                </SapOnePile>
                <SapOnePile>
                    <Register name="A" pins={state['REGA'].pins} zeroFlag={state['REGA'].zeroFlag} />
                    <Register name="B" pins={state['REGB'].pins} />
                    <Alu pins={state['ALU'].pins} carryFlag={state['ALU'].carryFlag} />
                    <Flags pins={state['FR'].pins} />
                    <InputOutput pins={state['IO'].pins} setPins={changeIOPins} />
                </SapOnePile>
                <SapOnePile>
                    <Clock
                        clock={clock}
                        clockButtonDown={singleStepDown}
                        clockButtonUp={singleStepUp}
                        isRunning={isRunning}
                        toggleRunning={toggleRunning}
                    />
                </SapOnePile>
                <SapOnePile>
                    <ControlSignals cntl={cntl} />
                </SapOnePile>
            </SapOneGrid>
            <Activity mode={ramEditorOpen ? 'visible' : 'hidden'}>
                <Lightbox onClose={toggleEditRam}>
                    <RamMonitor
                        ram={state['MEMORY'].pins}
                        onSave={onSaveRam}
                        onCancel={toggleEditRam}
                        opened={ramEditorOpen}
                    />
                </Lightbox>
            </Activity>
        </>
    )
}

export default App
