import React, { Activity, useState } from 'react'

import SapOneGrid from './components/ui/SapOneGrid'
import SapOnePile from './components/ui/SapOnePile'
import PushButton from './components/ui/buttons/PushButton'

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
import System from './components/modules/System'
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

    let controlStyle = {
        paddingTop: '0px',
        paddingRight: '15px',
        paddingBottom: '0px',
        paddingLeft: '0px'
    }

    let ARegControl = (
        <div className="control" style={controlStyle}>
            <PushButton name={'>'} on={cntl.controlFlags['ai']} onClick={() => cntl.toggleCmd('ai')} />
            <PushButton name={'<'} on={cntl.controlFlags['ao']} onClick={() => cntl.toggleCmd('ao')} />
        </div>
    )

    let BRegControl = (
        <div className="control" style={controlStyle}>
            <PushButton name={'>'} on={cntl.controlFlags['bi']} onClick={() => cntl.toggleCmd('bi')} />
            <PushButton name={'<'} on={cntl.controlFlags['bo']} onClick={() => cntl.toggleCmd('bo')} />
        </div>
    )

    let AluControl = (
        <div className="control" style={controlStyle}>
            <PushButton name={'<'} on={cntl.controlFlags['so']} onClick={() => cntl.toggleCmd('so')} />
            <PushButton name={'-'} on={cntl.controlFlags['su']} onClick={() => cntl.toggleCmd('su')} />
        </div>
    )
    let FlagsControl = (
        <div className="control" style={controlStyle}>
            <PushButton name={'>'} on={cntl.controlFlags['fi']} onClick={() => cntl.toggleCmd('fi')} />
        </div>
    )

    let IOControl = (
        <div className="control" style={controlStyle}>
            <PushButton name={'>'} on={cntl.controlFlags['oi']} onClick={() => cntl.toggleCmd('oi')} />
            <PushButton name={'<'} on={cntl.controlFlags['oo']} onClick={() => cntl.toggleCmd('oo')} />
        </div>
    )

    let CounterControl = (
        <div className="control" style={controlStyle}>
            <PushButton name={'>'} on={cntl.controlFlags['co']} onClick={() => cntl.toggleCmd('co')} />
            <PushButton name={'<'} on={cntl.controlFlags['jmp']} onClick={() => cntl.toggleCmd('jmp')} />
        </div>
    )

    let MEMControl = (
        <div className="control" style={controlStyle}>
            <PushButton name={'<'} on={cntl.controlFlags['mi']} onClick={() => cntl.toggleCmd('mi')} />
        </div>
    )

    let RAMControl = (
        <div className="control" style={controlStyle}>
            <PushButton name={'>'} on={cntl.controlFlags['ro']} onClick={() => cntl.toggleCmd('ro')} />
            <PushButton name={'<'} on={cntl.controlFlags['ri']} onClick={() => cntl.toggleCmd('ri')} />
        </div>
    )
    let InstructionRegisterControl = (
        <div className="control" style={controlStyle}>
            <PushButton name={'>'} on={cntl.controlFlags['io']} onClick={() => cntl.toggleCmd('io')} />
            <PushButton name={'<'} on={cntl.controlFlags['ii']} onClick={() => cntl.toggleCmd('ii')} />
        </div>
    )
    return (
        <>
            <h1>SAP One Computer</h1>
            <SapOneGrid>
                <SapOnePile>
                    <ProgramCounter
                        pins={state['PC'].pins}
                        counterEnabled={cntl.controlFlags['ce']}
                        onCounterEnabled={() => cntl.toggleCmd('ce')}
                        rightControl={CounterControl}
                    />
                    <MemoryAddressRegister pins={state['MAR'].pins} rightControl={MEMControl} />
                    <Ram
                        pins={state['RAM'].pins}
                        isRamEditorOpen={ramEditorOpen}
                        toggleRamEditor={toggleEditRam}
                        rightControl={RAMControl}
                    />
                    <InstructionRegister pins={state['IR'].pins} rightControl={InstructionRegisterControl} />
                    <ControlUnit pins={state['TSC'].pins} onClick={toggleControlUnit} enabled={!cntl.cue} />
                    <Clock clock={clock} />
                </SapOnePile>
                <SapOnePile>
                    <Bus pins={state['BUS'].pins} />
                </SapOnePile>
                <SapOnePile>
                    <Register
                        name="A"
                        pins={state['REGA'].pins}
                        zeroFlag={state['REGA'].zeroFlag}
                        leftControl={ARegControl}
                    />
                    <Register name="B" pins={state['REGB'].pins} leftControl={BRegControl} />
                    <Alu pins={state['ALU'].pins} carryFlag={state['ALU'].carryFlag} leftControl={AluControl} />
                    <Flags pins={state['FR'].pins} leftControl={FlagsControl} />
                    <InputOutput pins={state['IO'].pins} setPins={changeIOPins} leftControl={IOControl} />
                </SapOnePile>
                <SapOnePile>
                    <System
                        onButtonDown={() => cntl.setRst(true)}
                        onButtonUp={() => cntl.setRst(false)}
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
